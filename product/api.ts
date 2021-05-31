import axios from "axios"; 
import Papa from "papaparse";
import { Product } from "./types";

export default {
    list: async (): Promise<Product[]> => {
        return axios
            .get(
                `https://docs.google.com/spreadsheets/d/e/2PACX-1vQN3bMD0PVv5yioABzZlZMrrAR35cBUlyikuxeuPdUC1iSmgWyvi_DhsRLGyVxcTySe7_Xlj9SIYPUo/pub?output=csv`,
                {
                    responseType: 'blob'
                },
            )
            .then(
                (response) =>
                    new Promise<Product[]>((resolve, reject) => {
                        Papa.parse(response.data, {
                            header: true,
                            complete: (results) => {
                                const products = results.data as Product[];

                                return resolve(
                                    products.map((product) => ({
                                        ...product,
                                        price: Number(product.price),
                                    })),
                                );
                            },
                            error: (error) => reject(error.message),
                        });
                    })
            );
    },
};