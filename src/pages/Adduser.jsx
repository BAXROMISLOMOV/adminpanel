import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import { useEffect, useState } from "react";
import api from "../Api/api";
import useAuthstore from "../store/my-store";

function Adduser() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const authState = useAuthstore();

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users", {
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
      await api.post(
        "/api/users",
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
          </Form.Item>
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
                   value: "male"
                },
                { 
                  label: "Ayol",
                  value: "female"
                },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item>
            <Button  block htmlType="submit" type="primary" loading={loading}>
              Qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default Adduser;
