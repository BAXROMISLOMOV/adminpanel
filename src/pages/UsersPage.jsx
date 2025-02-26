import { Button, Drawer, message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthstore from "../store/my-store";
import Adduser from "./Adduser";
function UsersPage() {
  const [rents, setRents] = useState();
  const state = useAuthstore();
  useEffect(() => {
    axios
      .get(" https://library.softly.uz/api/users", {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
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
        <Adduser/>
      </div>
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
            key: "firstName",
            title: "ism ",
            dataIndex: "firstName",
          },
          {
            key: "lastName",
            title: "Familiya ",
            dataIndex: "lastName",
          },
        ]}
        dataSource={rents}
      />
    </div>
  );
}
export default UsersPage;
