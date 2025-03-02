import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuthstore from "../store/my-store";

function Adduser2() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const authState = useAuthstore();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://library.softly.uz/api/users", {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      message.error("Foydalanuvchilarni yuklashda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        "https://library.softly.uz/api/users",
        { ...values, phone: values.phone.toString() },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      message.success("Foydalanuvchi qo'shildi");
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
      <Button onClick={() => setIsOpen(true)} type="primary">
        Qoshish
      </Button>
      <Drawer
        title="Kitobxon qo‘shish"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        destroyOnClose
      >
        <Form onFinish={handleAddUser}>
          <Form.Item label="Ism" name="firstName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>Addbook
          <Form.Item
            label="Familya"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon raqam"
            name="phone"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Jinsi" name="gender" rules={[{ required: true }]}>
            <Radio.Group
              block
              options={[
                {
                  label: "Erkak",
                  value: "male",
                },
                {
                  label: "Ayol",
                  value: "female",
                },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
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

export default Adduser2;
