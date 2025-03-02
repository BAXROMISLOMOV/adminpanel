import { message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Adduser2 from "./Adduser2";
function RentsPage() {
  const [rents, setRents] = useState();
    const [isOpen, setIsOpen] = useState(false);
  z
  useEffect(() => {
    axios
      .get(" https://library.softly.uz/api/rents", {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUyLCJsaWJyYXJpYW4iOnRydWUsImxpYnJhcnlJZCI6MiwibG9jYXRpb25JZCI6Miwib3duZXIiOmZhbHNlLCJtb2RlcmF0b3IiOmZhbHNlLCJleHAiOjE3NDE0OTIwNzAsImlhdCI6MTc0MDQ1NTI3MH0.o71y7q07Bs_4PvZR8BJSFdtap2wyOg7OeN0nAy4iER4",
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setRents(res.data.items);
      })
      .catch((e) => {
        console.error(e);
        message.error("Error");
      });
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Kitobxonlar</h2>
        <Adduser2 />
      </div>
      <h2>retspage</h2>

      
      <Table
        bordered
        loading={rents ? false : true}
        columns={[
          {
            key: "id",
            title: "ID",
            dataIndex: "id",
          },
          {
            key: "leasedAt",
            title: "Berilgan sana",
            dataIndex: "leasedAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru");
            },
          },
          {
            key: "returnedAt",
            title: "Qaytarilgan",
            dataIndex: "returnedAt",
            render: (value) => {
             return <Switch  checked={value ? true : false}/>
            },
            

          },
          {
            key: "user",
            title: "Kitobxon",
            dataIndex: "user",
            render: (item) => {
              return <div> {item.id}.{item.firstName}</div>
             },
          },
        ]}
        dataSource={rents}
        rowKey={"id"}


      />
    </div>
  );
}
export default RentsPage;
