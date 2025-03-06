import { message, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../Api/api";
import useAuthstore from "../store/my-store";
import Adduser from "./Adduser";
import Editbook from "./Editbook";

function RentsPage({}) {
  const [rents, setRents] = useState({ items: [], totalCount: 0 });
  const token = useAuthstore((state) => state.token);
  const [currentPage, setCurrentPage] = useState(1);

  const [books, setBooks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rent, setRent] = useState({});

  const pageSize = 10;

  const Rentsrefresh = () => {
    setLoading(true);
    api
      .get("/api/rents", {
        params: { size: pageSize, page: currentPage },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRents(res.data);
        const books_ids = res.data.items.map(
          (item) => {
            return item.stock.bookId;
          },
          [currentPage, token]
        );
        api
          .get("/api/books", {
            params: {
              id: books_ids,
            },
          })
          .then((res) => {
            setBooks(res.data.items);
          });
      })
      .catch((e) => {
        console.error(e);
        message.error("Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    Rentsrefresh();
  }, [currentPage, token]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Ijaralar</h2>
        <Adduser RentsRefresh={Rentsrefresh} />
      </div>
      <h2></h2>
      <Editbook
        user={books}
        setRents={setRent}
        rent={rent}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Table
        bordered
        columns={[
          {
            key: "id",
            title: "ID",
            dataIndex: "id",
            render: (id) => {
              return (
                <div
                onClick={() => {
                  setIsOpen(true);
                  setRent(rents.items.find((item) => item.id === id));
                }}
                
                  className="text-blue-600 cursor-pointer"
                >
                  {id}
                </div>
              );
            },
          },
          {
            key: "user",
            title: "Ism",
            dataIndex: "user",
            render: (item) => <div>{item.firstName}</div>,
          },
          {
            key: "user",
            title: "Familiya",
            dataIndex: "user",
            render: (item) => <div>{item.lastName}</div>,
          },
          {
            key: "leasedAt",
            title: "Berilgan sana",
            dataIndex: "leasedAt",
            render: (value) => new Date(value).toLocaleString("ru"),
          },
          {
            key: "returnedAt",
            title: "Qaytarilgan",
            dataIndex: "returnedAt",
            render: (value) => <Switch checked={Boolean(value)} />,
          },
          {
            key: "user",
            title: "Kitobxon",
            dataIndex: "user",
            render: (item) => (
              <div className="text-blue-500">
                {item.id}. {item.firstName} . {item.phone}
              </div>
            ),
          },
          {
            key: "stock",
            title: "Zaxira Kitobi",
            dataIndex: "stock",
            render: (item) => {
              return <Zaxiradagikitob stock={item} books={books} />;
            },
          },

          {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <span
                style={{
                  background: status === 1 ? "#ffcccc" : " lightgreen",
                  color: status === 1 ? "red" : " green",
                  fontWeight: "bold",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {status === 1 ? "Blocked" : " Active"}
              </span>
            ),
          },
          {
            key: "blockingReason",
            title: "Bloklanish sababi",
            dataIndex: "blockingReason",
          },
          {
            key: "createdAt",
            title: "yasalgan sana",
            dataIndex: "createdAt",
            render: (value) => new Date(value).toLocaleString("ru"),
          },
          {
            key: "updatedAt",
            title: "Yangilangan sana",
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
function Zaxiradagikitob({ stock, books }) {
  const book = books?.find((item) => {
    return item.id === stock.bookId;
  });
  return (
    <div>
      {stock.id}/{stock.bookId} {book?.name}
    </div>
  );
}

export default RentsPage;
