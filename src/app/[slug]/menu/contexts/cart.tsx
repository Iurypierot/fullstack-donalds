"use client";
import { Product } from "@prisma/client";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  totalQuantity: number,
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  totalQuantity: 0,
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Calculando o total do carrinho
  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  // Persistindo o carrinho no localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("cart");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  // Função para alternar o estado do carrinho (aberto/fechado)
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  // Função para adicionar um produto ao carrinho
  const addProduct = (product: CartProduct) => {
    if (product.quantity <= 0) return;

    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );

    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  // Função para diminuir a quantidade de um produto
  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts
        .map((product) => {
          if (product.id !== productId) return product;

          if (product.quantity === 1) {
            return null; // Se for 1, remover o produto do carrinho
          }

          return { ...product, quantity: product.quantity - 1 };
        })
        .filter((product): product is CartProduct => product !== null); // Remove os nulls
    });
  };

  // Função para aumentar a quantidade de um produto
  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id !== productId) return product;

        return { ...product, quantity: product.quantity + 1 };
      });
    });
  };

  // Função para remover um produto do carrinho
  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        total,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
