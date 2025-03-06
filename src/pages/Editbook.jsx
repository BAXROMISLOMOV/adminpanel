import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, message, Select } from "antd";
import "antd/dist/reset.css";
import React, { useEffect, useState } from "react";
import api from "../Api/api";

function Editbook({ onRefresh, setIsOpen, isOpen, rent, setRents }) {
  const [loading, SetLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [stock, setStock] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(rent);
    api.get(`api/users`, {}).then((res) => {
      setUser(res.data.items);

      api
        .get("api/stocks", {
          params: {
            "filters[busy]": false,
          },
        })
        .then((res) => {
          setStock(res.data.items);
        });
    });
    console.log("Rent ma'lumotlari:", rent);
  }, [rent, form]);

  return (
    <>
      <Drawer
        title={
          <div className="flex items-center justify-between ">
            <p className="text-2xl">Kitoblar ozgartirish</p>
            <p>
              <CloseOutlined
                className="cursor-pointer text-lg"
                onClick={() => setIsOpen(false)}
              />
            </p>
          </div>
        }
        closeIcon={null}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={{
            ...rent,
            leasedAt: rent?.leasedAt ? rent.leasedAt.slice(0, 10) : "",
            returningDate: rent?.returningDate
              ? rent.returningDate.slice(0, 10)
              : "",
          }}
          onFinish={(value) => {
            if (!rent || !rent.id) {
              message.error("Xatolik: rent ma'lumotlari mavjud emas!");
              return;
            }
            console.log("PUT uchun jo'natilayotgan ma'lumotlar:", value);
            SetLoading(true);
            api
              .put(`api/rents/${rent.id}`, value)
              .then((res) => {
                setIsOpen(false);
                setRents(res.data);
                message.success("O'zgartirildi");

                onRefresh?.();
              })
              .catch((e) => {
                message.error(e.response?.data?.message || "Xatolik yuz berdi");
                console.error(e);
              })
              .finally(() => {
                SetLoading(false);
              });
          }}
        >
          <Form.Item label={"Kitob qoshish"} name={"stockId"}>
            <Select
              showSearch
              placeholder="Kitob Qoshish"
              options={stock?.map((rent) => ({
                value: rent.id,
                label: rent.book.name,
              }))}
            />
          </Form.Item>

          <div className="flex gap-2">
            <Form.Item
              label="Olish sanasi"
              name={"leasedAt"}
              rules={[{ required: true, message: "Olish sanasini tanlang!" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="Topshirish sanasi"
              name="returningDate"
              rules={[
                { required: true, message: "Topshirish sanasini tanlang!" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </div>

          <Button loading={loading} type="primary" htmlType="submit">
            {loading ? "Saqlanmoqda " : "Saqlash"}
          </Button>
        </Form>
      </Drawer>
    </>
  );
}

export default Editbook;
