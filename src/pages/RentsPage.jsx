import { message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
function RentsPage() {
  const [rents, setRents] = useState();
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
            key: "gvfc",
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

      />
    </div>
  );
}
export default RentsPage;
