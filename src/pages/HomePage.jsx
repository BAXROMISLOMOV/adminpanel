import { message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://67a4e835c0ac39787a1ce18e.mockapi.io/user")
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
      <h1 className="text-2xl font-bold m-2">Bosh Sahifa</h1>
      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Ism",
            dataIndex: "name",
          },
          {
            title: "kasb",
            dataIndex: "work",
            render: (work) => {
              console.log(work);
              return <img className=" h-9" src={work} />;
            },
          },

          {
            title: " rasim",
            dataIndex: "image",
            render: (image) => {
              console.log(image);
              return <img className=" h-9" src={image} />;
            },
          },

          {
            title: "jins",
            dataIndex: "gender",
          },
        ]}
        dataSource={products}
      />
    </>
  );
}

export default HomePage;
