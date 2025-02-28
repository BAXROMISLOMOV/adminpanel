import { message, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthstore from "../store/my-store";
import Adduser from "./Adduser";
import Edituser from "./Edituser";

function UsersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rents, setRents] = useState();
  const state = useAuthstore();
  const pageSize = 10;
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/users", {
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
      <Edituser user={user} isOpen={isOpen} setIsOpen={setIsOpen} />

      <Table
        bordered
        loading={rents ? false : true}
        columns={[
          {
            key: "id",
            title: "ID",
            dataIndex: "id",
            render: (id, item) => {
              return (
                <div
                  onClick={() => {
                    setUser(item);
                    setIsOpen(true);
                  }}
                >
                  {id}
                </div>
              );
            },
          },
          {
            key: "firstName",
            title: "Ism",
            dataIndex: "firstName",
          },
          {
            key: "lastName",
            title: "Familiya",
            dataIndex: "lastName",
          },
          {
            key: "phone",
            title: "Telephone",
            dataIndex: "phone",
          },
          {
            key: "phoneVerified",
            title: "Qoshimcha.t",
            dataIndex: "phoneVerified",
          },
          {
            key: "passportId",
            title: "Passsport",
            dataIndex: "passportId",
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
            dataIndex: "balance",
          },
          {
            key: "blockingReason",
            title: "Bloklanish sababi",
            dataIndex: "blockingReason",
          },
          {
            key: "birthDate",
            title: "Tug'ilgan sana",
            dataIndex: "birthDate",
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
          total: rents.totalCount,
        }}
        rowKey={"id"}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}

export default UsersPage;
