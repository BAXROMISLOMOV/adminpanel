import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuthstore from "../store/my-store";

function Addbook({ isOpen, setIsOpen, user }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const authState = useAuthstore();

  const fetchUsers = async () => {
    try {
      const response = await axios.post( `https://library.softly.uz/api/stocks${bookId}`,
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      setUsers(response.data);
    } catch (_) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (values) => {
    setLoading(true);
    try {
      await axios.post(   `https://library.softly.uz/api/stocks${bookId}`,
        { ...values, phone: values.phone.toString() },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      message.success("Foydalanuvchi yangilandi");
      fetchUsers();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      message.error("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer
        title="Kitob Qo'shish"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        destroyOnClose
      >
        <Form initialValues={user} onFinish={handleAddUser}>
          <Form.Item label="" name="" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label=""
            name=""
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label=" "
            name=""
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" type="primary" loading={loading}>
              O'zgartirish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default Addbook;
