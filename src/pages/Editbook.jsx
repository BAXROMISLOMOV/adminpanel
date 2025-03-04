import { Button, Drawer, Form, message, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../Api/api";
import useAuthstore from "../store/my-store";

function Editbook({ isOpen, setIsOpen, bookId }) {
  const [loading, setLoading] = useState(false);
  const authState = useAuthstore();
  const [books, setBooks] = useState([]);

  const fetchUsers = async () => {
    if (!bookId) return;
    try {
      const response = await api.get(
        `/api/stocks/${bookId}`,
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      console.log("API Response:", response.data);
setUsers(response.data);
setBooks(response.data.items || []);

    } catch (error) {
      console.error("Kitoblarni yuklashda xatolik:", error);
      message.error("Kitoblarni yuklashda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchUsers();
    }
  }, [bookId]);

  const handleAddUser = async (values) => {
    setLoading(true);
    try {
      await api.post(
        "/api/books",
        { bookId: values.bookId },
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
        title="Kitobxon O'zgartirish"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        destroyOnClose
      >
        <Form initialValues={{ bookId: bookId }} onFinish={handleAddUser}>
          <Form.Item
            label="Kitob"
            name=""
            rules={[{ required: true, message: "Kitobni tanlang" }]}
          >
            <Select
              placeholder="Kitobni tanlang"
              options={
                books && Array.isArray(books)
                  ? books.map((book) => ({
                      label: book.name,
                      value: book.name, 
                    }))
                  : []
              }
            />
            </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" type="primary" loading={loading}>
              O‘zgartirish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default Editbook;
