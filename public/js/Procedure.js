

class Procedure {
    constructor(thumbs=[],imagesArr=[],procedureNum=1,instructions='default instructions'){
        this.images = imagesArr
        this.procedureNum=procedureNum
        this.instructions=instructions
        this.thumbs = thumbs
    }
    procedureHtml(){
        const element = ` 
        <section class="procedure--details small-padding">
        <h3>Repair Procedure</h3>

        
        <!-- images uploaded -->
        <fieldset class=" procedure--images-list">
            <legend>Images
                <!-- add another image button -->
                
            </legend>

            <ol class="uploads" data-totalfiles="0" data-uploadId="0">
                <!-- <li class="imageuploaded">
                    <img src="" alt="repair image" class="img-mini">
                    <input  data-uploadnum="1" type="file" name="picture1" accept="image/*" onchange="previewImage(event)"  >
                    <span class="button clickable">remove item</span>
                </li> -->
            
            </ol>
            <div class="add-img button clickable " data-action="add-image">add another image</div>
        
        </fieldset>
        
        <textarea name="instructions1" id="instructions1" class="instructions" cols="5" rows="5" value="test dfafamongo"></textarea>
        
        
        
         
        
    </section>
   <section>
        <div class="add-proc button clickable button--medium  " data-action="add-procedure">add another step after this one</div>
   </section> `;

   return element;
    }

    

}
