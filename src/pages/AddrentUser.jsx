import { Button, DatePicker, Drawer, Form, message, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../Api/api";
import useAuthstore from "../store/my-store";

function AddUser({ RentsRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const authState = useAuthstore();

  const [data, setData] = useState({
    users: [],
    stocks: [],
  });

  useEffect(() => {
    api
      .get("/api/stocks", {
        headers: { Authorization: `Bearer ${authState.token}` },
      })

      .then((res) => {
        setData((prevData) => ({
          ...prevData,
          stocks: res.data.items,
        }));
        RentsRefresh?.();
      })
      .catch((err) => {
        console.error("Stocks API error:", err);
      });
    console.log("Headers:", {
      Authorization: `Bearer ${authState.token}`,
    });

    api
      .get("/api/users", {
        headers: { Authorization: `Bearer ${authState.token}` },
      })
      .then((res) => {
        setData((prevData) => ({
          ...prevData,
          users: res.data.items,
        }));
      })
      .catch((err) => {
        console.error("Users API error:", err);
      });
  }, []);

  const handleAddUser = (values) => {
    console.log("Form data:", values);
    console.log("Kitobxona ID:", values.userId);
    console.log("Kitob ID:", values.stockId);

    if (!values.userId || !values.stockId) {
      console.error("Kitobxon yoki kitob ID mavjud emas!");
      return;
    }

    const id = values.userId.toString();
    console.log("ID toString:", id);

    setLoading(true);
    api
      .get(
        "/api/rents",
        {
          userId: values.userId,
          stockId: values.stockId,
          leasedAt: values.leasedAt.format("DD-MM-YYY"),
          returningDate: values.returningDate.format("DD-MM-YY"),
        },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      )
      .then(() => {
        message.success("Foydalanuvchi muvaffaqiyatli qo'shildi!");
        form.resetFields();
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("Foydalanuvchi qo‘shishda xato:", err);
        message.error("Xatolik yuz berdi!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} type="primary">
        Qoshish
      </Button>
      <Drawer
        title="Kitobxon"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        destroyOnClose
      >
        <Form form={form} onFinish={handleAddUser}>
          <Form.Item
            label="Kitobxon"
            name="userId"
            rules={[{ required: true }]}
          >
            <Select
              options={data.users.map((user) => ({
                label: `${user.firstName} ${user.lastName}`,
                value: user.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Kitob zahirasi"
            name="stockId"
            rules={[{ required: true }]}
          >
            <Select
              options={data.stocks.map((stock) => ({
                label: stock.book.name,
                value: stock.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Topshirilgan sana"
            name="leasedAt"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Qaytarilgan sana"
            name="returningDate"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" type="primary" loading={loading}>
              Qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddUser;
