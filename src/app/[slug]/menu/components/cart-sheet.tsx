import { useContext } from "react";

import { 
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle 
} from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";

const CartSheet = () => {
    const { isOpen, toggleCart } = useContext(CartContext)
    return (  
         <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent>
           <SheetHeader>
               <SheetTitle>Are you absolutely sure?</SheetTitle>
               <SheetDescription>
                   just make sure you don&apos;t have any unsaved changes.
               </SheetDescription>
           </SheetHeader>
       </SheetContent>
   </Sheet> );
}
 
export default CartSheet;