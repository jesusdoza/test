

// const Procedure = require('./Procedure')
const form = document.querySelector("#repair-form");

//main repair object sent to server
class Repair{
    constructor(procedures=[],searchtags='blank tags',title='blank title', board='no board type', engine='no engine make'){
        this.procedureArr=procedures;
        this.searchtags=searchtags;
        this.title=title;
        this.boardType=board;
        this.engineMake=engine;
        this.removed=false;
    }

    addProcedure(proc) {
        this.procedureArr.push(proc);
        this.getObj()
    }

    getObj(){
        return this;
    }

    buildRepair (procArr){
        console.log(procArr)
            this.procedureArr = procArr;
            this.boardType=document.querySelector('#board-type').value;
            this.searchtags= document.querySelector('#search-tags').value;
            this.title =  document.querySelector('#title').value;
            this.engineMake = document.querySelector('input:checked.model').value;
            
        return this
    }
    
}

// sub class inside Repair
class Procedure {
    constructor(thumbs=[],imagesArr=[],procedureNum=1,instructions='default instructions'){
        this.images = imagesArr
        this.procedureNum=procedureNum
        this.instructions=instructions
        this.thumbs = thumbs
        this.imagesIdArr
    }
    procedureHtml(){
        const element = ` 
        <section class="grey procedure--details small-padding">
            <h3>Repair Procedure</h3>

            
            <!-- images uploaded -->
            <fieldset class=" procedure--images-list ">
                <legend>Images
                    <!-- add another image button -->
                    
                </legend>

                <ol class="uploads" data-totalfiles="0" data-uploadId="0">
                    <!-- <li class="imageuploaded small-padding ">
                        <img src="" alt="repair image" class="img-mini">
                        <input  data-uploadnum="1" type="file" name="picture1" accept="image/*" onchange="previewImage(event)"  >
                        <span class="button--mobile rounded clickable">remove item</span>
                    </li> -->
                
                </ol>
                <div class="btn bg-warning text-black " data-action="add-image">
                    add another image
                </div>
            
            </fieldset>
            <!-- <fieldset class=""> -->
                <legend class="" >Instructions</legend>
                <textarea id="instructions1" class="textarea textarea-warning instructions center-block large-input white" 
                    placeholder="Instructions"
                    name="instructions1"
                    value=""
                    rows="8"></textarea>
                
        </section>
        <section class="controls">
        <div class="bg-accent text-base-200 btn add-proc" data-action="add-procedure">
            add another step
        </div>
        
        <details class="warning">
            <summary class=" btn text-black bg-warning remove-proc"> Delete Procedure</summary>
            <div class=" btn bg-error-content text-white" data-action="remove-procedure">confirm delete</div>
        </details>
        </section>  `;

   return element;
    }

}

// =================================================
// EVENT LISTENERS
// =================================================
document.addEventListener('DOMContentLoaded', async () => {
    const instructions =form.querySelector('#instructions')

    instructions.addEventListener('click',(event)=>{
   
        const action = event.target.dataset.action
            console.log(`click event `, action)

        //parent of procedure of target
        const procedure = event.target.closest('.procedure')

        switch (action) {
            case 'add-image':
                console.log(`add image`)
                addImageToProcedure(event);
                break;

            case 'remove-image':
                removeImage(event);
                break;

            case 'remove-procedure':
                console.log('remove procedure clicked')
                
                removeProcedure(event);
                break;

            case 'add-procedure':
                addProcedureToInstructions(event);
                break;

            default:
                console.log('nothing wanted clicked')
                break;
        }

    })
})


            


 //submit form event
//  form.addEventListener("submit",async (event) => event.preventDefault());// for testing what happens after submit 
 form.addEventListener("submit",async (event) => {
    event.preventDefault();
    
    const allProcedures = Array.from( document.querySelectorAll('.procedure'))// get all procedures on page
    const signResponse = await fetch('/signform'); //fetch signature from server
    const signData = await signResponse.json();//convert to json
    
    //status message overlay
    const statusIcons = document.querySelector('.status-icons')//
    const progress = statusIcons.querySelector('.progress')
    statusIcons.classList.toggle("hidden");//show loading message

    const form = document.querySelector('#repair-form');//get repair form
    form.classList.toggle("hidden");//hide form 

    let procArr = [] //array with all the procedures for this repair
    const repair = new Repair // actual object to submit to server

    

//build map of promises for uploading images from all procedures
   const procedurePromises=Array.from(allProcedures).map( async(proc,index)=>{

        //upload images if any
        let images= await uploadImages(proc, signData)
        console.log(images)

        const procedure = new Procedure();
           procedure.images= images.links; // add images urls Array
           procedure.thumbs = images.thumbs;
           procedure.procedureNum = index; //identifying sequence number
           procedure.imagesIdArr = images.imagesIdArr//!problem not sending this to server
           //! problem here
           procedure.instructions = proc.querySelector('.instructions').value //instructions for this procedure
        return (procedure)
       
    })

    // todo add try block when submitting
    try {
      
            statusMessage('<br>Uploading images...')
            progress.value+=10
        procArr = await Promise.all(procedurePromises) 
            statusMessage('Done')
            progress.value=50

        repair.buildRepair(procArr) // build repair using procedure array 
            statusMessage('<br>Saving Report...')
            progress.value+=75

        // const repairId = await postRepair(repair);
        const serverResponse = await postRepair(repair);
        console.log(`server response`,serverResponse)
        statusMessage('Done')
        progress.value+=100
        
        //we take link server provides
        location.assign(serverResponse.link);

    } catch (error) {
        // todo if error do not refresh and show form again with message failed to submit
        statusIcons.classList.toggle("hidden");//hide loading message
        form.classList.toggle("hidden");//show form 
        console.error(`Submit error`,error);
        window.confirm('Submit error')
    }
    


    async function postRepair(repairObj){

        try{
            // let repair = JSON.stringify({repairObj})
    
            const response = await fetch(`/repair`,{
                 method: 'post',
                 headers: {'Content-Type':'application/json'},
                 body:JSON.stringify(repairObj)
             }).then(data=>data.json())
             return response;
           
        }
       
        catch(error){
            console.error(`post error`)
        }
        
    }

});





// ==========================================================================
// FUNCTIONS
// ==========================================================================

function removeProcedure(event){
    console.log(`deleting procedure`)
    const procedure = event.target.closest('.procedure');
    // console.log(procedure)
    procedure.remove();
}
// display status message
function statusMessage(text){
    
    
    const statusMessage = document.querySelector('.loading-text')

    statusMessage.innerHTML+=`${text}`

}



//add another procedure to instructions
function addProcedureToInstructions(event){
    const procedure = new Procedure()
    // console.log(`add procedure`)

    const instructions = event.target.closest('#instructions');
        instructions.dataset.currentprocid++;
        
    const parentProcedure = event.target.closest('.procedure')//new
    

    const li = document.createElement('li');
        li.dataset.procedureid=instructions.dataset.currentprocid;
        li.classList.add('procedure','small-padding','card','bg-base-100','shadow-xl')
        li.innerHTML=procedure.procedureHtml();
    

    // instructions.appendChild(li);
    parentProcedure.insertAdjacentElement("afterend",li)
}









 function buildRepair (procArr){
    const repair =  new Repair()
    // console.log(procArr)
        repair.procedureArr = procArr;
        repair.boardType=document.querySelector('#board-type').value;
        repair.searchtags= document.querySelector('#search-tags').value;
        repair.title =  document.querySelector('#rep-title').value;
        repair.engineMake = document.querySelector('.model input:checked').value;
    
    return repair
}




//return image links after uploading
//! working on getting a response object instead of just a string[]
 async function uploadImages(element, signData){

    // const files=element
    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    const formData = new FormData();
    
    //get images
    const imagesToUpload=getImages(element);

    let uploadPromises = Array.from(imagesToUpload).map(async (filesList)=>{
        for (let i = 0; i < filesList.length; i++) {
            let file = filesList[i];
            formData.append("file", file);
            formData.append("api_key", signData.apikey);
            formData.append("timestamp", signData.timestamp);
            formData.append("signature", signData.signature);
            // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260"); //some form of transformation dont need
            // formData.append("folder", "cata"); //put this file in folder named cata
            formData.append("folder", signData.folder); //put this file in folder named cata

            const response = await fetch(url, {
                    method: "POST",
                    body: formData
                }).then(data => data.json());
            
            // imageLinks.push(response.url)
            console.log(`link`,response.url)

            //! return the response as a whole 1**
            /// return response.url    
            console.log(response)
            return response //! response as whole returned
        }

    })

    //array of responses after upload
    let uploadResponses = await Promise.all(uploadPromises)//! response object returned 2**

    const imageurls = uploadResponses.map((response)=>{
        return response.url
    })
    const thumbsLinks = uploadResponses.map((response)=>{//!extracting url here for thumb
        //larger thumb
        // return response.replace('/upload/','/upload/c_scale,w_400/')
        return response.url.replace('/upload/','/upload/c_scale,w_400/'); //!extracting url from response obj
    })
    const idList = uploadResponses.map((response)=>{//!extracting url here for thumb
        return response.public_id;//!extracting url from response obj
    })


    return {
        // links:uploadResponses, //! array of url links to images 
        links:imageurls, //! array of url links to images 
        thumbs:thumbsLinks, //! array of url links to thumbs
        imagesIdArr:idList //!array of image ids from cloudinary
    }
    
}





//get images if any and return them
function getImages(element){
    let files = []

    // get all elements with files
    const allUploads = element.querySelectorAll("[type=file]");

        allUploads.forEach((image)=>{

            //if a file is attached 
            if(image.files.length >0){
                files.push(image.files)
            }
        })

return files;
}




function removeImage(event){

    const procedure = event.target.closest('.procedure');
    const uploadList = procedure.querySelector('.uploads');
        uploadList.dataset.totalfiles--;
    //li the image input is in
    const imageListItem = event.target.closest('li');
    imageListItem.remove();
}

//preview image on page locally when input for image is changed
function previewImage(event){

    const uploadnum= event.target.closest('.uploads').dataset.totalfiles    
    const currentUpload = event.target.closest('.imageuploaded') 
        const image = currentUpload.querySelector('img');
            image.src = URL.createObjectURL(event.target.files[0]);
            image.alt='image preview';
            image.classList.add('img-mini');
   
}




// add extra image input to DOM
function addImageToProcedure(event){
    //parent line item
    const procedure = event.target.closest('.procedure')

    const uploadList = procedure.querySelector('.uploads');
        uploadList.dataset.totalfiles++; //amount of files
        uploadList.dataset.uploadId++; //id for uploading

    let uploadId =uploadList.dataset.uploadId;

    const image = document.createElement('img')
        image.alt='image preview';
        image.classList.add('img-mini');

    const input = document.createElement('input');
        input.dataset.uploadId = uploadId;
        input.name=`picture${uploadId}`;
        input.type='file';
        input.accept="image/*";
        input.onchange=(event)=>{previewImage(event)}

    const removeButton = document.createElement('span');
        removeButton.classList.add('button--mobile', 'clickable','rounded','btn');
        removeButton.innerText='remove item';
        removeButton.dataset.action='remove-image';
        removeButton.dataset.uploadId = uploadId;
        
    const li = document.createElement('li');
        li.classList.add('card','blue','imageuploaded','small-padding');
        li.appendChild(image)
        li.appendChild(input);
        li.appendChild(removeButton);
    

    uploadList.appendChild(li);

   
}

