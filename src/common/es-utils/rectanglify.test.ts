import { tagUnindent } from "../../test-utils/index";
import { rectanglify } from "./rectanglify";

describe(rectanglify.name, () => {
    it("add extra padding in the end of each line of the provided string so that it is like a square", () => {
        expect(
            // prettier-ignore
            rectanglify(tagUnindent`
                 o
                |_  o
                |  |_  o
                |     |_  o
                |        |_  o
                |        |  |_  o
                |        |_  o
                |           |_  o
                |_  o
                |_  o
                   |_  o
                      |_  o
                      |_  o
                      |  |_  o
                      |     |_  o
                      |        |_  o
                      |_  o
                      |_  o
                         |_  o
            `)
        ).toBe(tagUnindent`
             o                  
            |_  o               
            |  |_  o            
            |     |_  o         
            |        |_  o      
            |        |  |_  o   
            |        |_  o      
            |           |_  o   
            |_  o               
            |_  o               
               |_  o            
                  |_  o         
                  |_  o         
                  |  |_  o      
                  |     |_  o   
                  |        |_  o
                  |_  o         
                  |_  o         
                     |_  o      
        `);
    });
});
