"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";



interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{ 
        include: { 
            restaurant:{
                select:{
                    name: true;
                    avatarImageUrl: true;
                };
            };
        };
    }>,
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(1);
    const handleDescreaseQuantity = () => {
        setQuantity((prev) => {
            if (prev === 1) {
            return 1;
            }
            return prev -1;
        })
    };
    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };
    return ( 
        <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col rounded-t-3xl p-5">
            <div className="flex-auto">
                 {/* RESTAURANTE */}
                 <div className="flex items-center gap-1.5 ">
                    <Image
                        src={product.restaurant.avatarImageUrl}
                        alt={product.restaurant.name}
                        width={16}
                        height={16}
                        className="rounded-full"
                    />
                    <p className="text-xs text-muted-foreground">
                        {product.restaurant.name}
                     </p>
                </div>

                {/* NOME DO PRODUTO */}
                <h2 className="mt-1 text-xl font-semibold">
                    {product.name}</h2>

                {/* PREÇO E QUANTIDADE */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                       {formatCurrency(product.price)}
                    </h3>
                <div className="flex items-center gap-3 text-center">
                       <Button
                       variant="outline" 
                       className="h-8 w-8 rounded-xl"
                       onClick={handleDescreaseQuantity}
                    >
                    <ChevronLeftIcon />
                    </Button> 

                    <p className="w-4">{quantity}</p>

                        <Button
                         variant="destructive" 
                         className="h-8 w-8 rounded-xl"
                         onClick={handleIncreaseQuantity}
                         >
                        <ChevronRightIcon />
                        </Button> 
                    </div>
                    
                
             </div>
                {/* SOBRE */}
                <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">Sobre</h4>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                    {/* INGREDIENTS */}
                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-1 5">
                        <ChefHatIcon size={18} />
                    <h4 className="font-semibold">Ingrediente</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.ingredients}</p>
                </div> 
                
                 
            </div>

            <Button className="w-full rounded-full mt-6"> Adicionar à sacola</Button>
        </div>
     );
};
 
export default ProductDetails;