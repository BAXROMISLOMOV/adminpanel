import { Button, message, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthstore from "../store/my-store";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Addbook from "./AddBook";

function Stocks() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rents, setRents] = useState();
  const state = useAuthstore();
  const pageSize = 10;
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/stocks", {
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
        <h2 className="text-xl font-bold"> kitoblar</h2>
        <Addbook user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <Button>
        <Addbook  />
      </Button>

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
            key: "book",
            title: "Kitob",
            dataIndex: "book",
            render: (book) => {
              return <div>{ book?.name}</div>;
            },
          },
          {
            key: "busy",
            title: " Bandlig",
            dataIndex: "busy",
            render: (busy) => (
              <span
                style={{
                  color: busy === true ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {busy === true ? (
                  <CloseCircleOutlined />
                ) : (
                  <CheckCircleOutlined />
                )}
              </span>
            ),
          },
          {
            key: "createdAt",
            Title: "Yasalgan",
            dataIndex: "createdAt",
            render: (value) => new Date(value).toLocaleString("ru"),
          },
          {
            key: "updatedAt",
            title: "Yangolangan",
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

export default Stocks;
