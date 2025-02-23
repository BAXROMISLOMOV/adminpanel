import { message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
        message.error("Error");
      });
  }, []);
  if (!products) {
    return <div>...Loading</div>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold m-2">Mahsulotlar Sahifasi</h1>
      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Yasalgan Vaqti",
            dataIndex: "createdAt",
          },
          {
            title:"Nomi",
            dataIndex: "name",
          },
          {
            title: " rasim",
            dataIndex: "image",
            render:(image) =>{
              console.log(image);
             return <img className=" h-9" src={image}/>
             
              
            }
          },
          
          
        ]}
        dataSource={products}
      />
    </>
  );
}

export default ProductsPage;
