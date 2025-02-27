import { message, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthstore from "../store/my-store";
import Adduser from "./Adduser";
function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rents, setRents] = useState();
  const state = useAuthstore();
  const pageSize = 10;
  
  useEffect(() => {
    axios
      .get(" https://library.softly.uz/api/users", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRents(res.data);
      })
      .catch((e) => {
        console.error(e);
        message.error("Error");
      });
  }, [currentPage]);

  if (!rents) {
    return <Spin />;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Kitobxonlar</h2>
        <Adduser />
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
          {
            key: "phone",
            title: "Telephone ",
            dataIndex: "phone",
          },
        ]}
        dataSource={rents.items}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: rents.totalCount,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}
export default UsersPage;
