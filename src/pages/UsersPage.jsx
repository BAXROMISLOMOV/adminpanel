import { message, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import useAuthstore from "../store/my-store";
import Adduser from "./Adduser";
import Edituser from "./Edituser";
import api from "../Api/api";

function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rents, setRents] = useState({ items: [], totalCount: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const token = useAuthstore((state) => state.token);
  const pageSize = 10;

  useEffect(() => {
    api
      .get("/api/users", {
        params: { size: pageSize, page: currentPage },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setRents(res.data);
      })
      .catch((e) => {
        console.error(e);
        message.error("Error");
      });
  }, [currentPage, token]);

  if (!rents.items.length) {
    return <Spin />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Kitobxonlar</h2>
        <Adduser />
      </div>
      <Edituser user={user} isOpen={isOpen} setIsOpen={setIsOpen} />

      <Table
        bordered
        loading={!rents.items.length}
        columns={[
          {
            key: "id",
            title: "ID",
            dataIndex: "id",
            render: (id, item) => (
              <div
                className="text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={() => {
                  setUser(item);
                  setIsOpen(true);
                }}
              >
                {id}
              </div>
            ),
          },
          { 
            key: "firstName",
             title: "Ism", dataIndex:
              "firstName" 
            },
          { key: "lastName", 
            title: "Familiya", 
            dataIndex: "lastName" 
          },
          { key: "phone",
            title: "Telephone",
            dataIndex: "phone" 
          },
          { key: "phoneVerified",
            title: "Qoshimcha.t",
            dataIndex: "phoneVerified"
          },
          { key: "passportId",
            title: "Passsport",
            dataIndex: "passportId"
           },
          {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <span
                style={{
                  background: status === 1 ? "lightgreen" : "#ffcccc",
                  color: status === 1 ? "green" : "red",
                  fontWeight: "bold",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {status === 1 ? "Active" : "Blocked"}
              </span>
            ),
          },
          {
             key: "balance",
            title: "Hisob", 
            dataIndex: "balance" 
          },
          { 
            key: "blockingReason", 
            title: "Bloklanish sababi", 
            dataIndex: "blockingReason" 
          },
          { 
            key: "birthDate", 
            title: "Tug'ilgan sana", 
            dataIndex: "birthDate" 
          },
          {
            key: "createdAt",
            title: "Yaratilgan",
            dataIndex: "createdAt",
            render: (value) => new Date(value).toLocaleString("ru"),
          },
          {
            key: "updatedAt",
            title: "Yangilangan",
            dataIndex: "updatedAt",
            render: (value) => new Date(value).toLocaleString("ru"),
          },
        ]}
        dataSource={rents.items}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: rents.totalCount || 0,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="id"
      />
    </div>
  );
}

export default UsersPage;
