import { Button, Drawer, Form, Select, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuthstore from "../store/my-store";

function Addbook() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]); 
  const authState = useAuthstore();
  

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://library.softly.uz/api/books", {
        headers: { Authorization: `Bearer ${authState.token}` },
      });

      console.log("API Response:", response.data); 
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Kitoblarni yuklashda xatolik:", error);
      message.error("Kitoblarni yuklashda xatolik yuz berdi");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        "https://library.softly.uz/api/stocks",
        { bookId: values.bookId },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      message.success("Kitob qo'shildi");
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
        Qo‘shish
      </Button>
      <Drawer
        title="Kitob qo‘shish"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        destroyOnClose
      >
        <Form onFinish={handleAddBook}>
          <Form.Item
            label="Kitob"
            name="bookId"
            rules={[{ required: true, message: "Kitobni tanlang" }]}
          >
            <Select
              placeholder="Kitobni tanlang"
              options={
                books && Array.isArray(books)
                  ? books.map((book) => ({
                      label: book.title,
                      value: book.name,
                    }))
                  : []
              }
            />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" type="primary" loading={loading}>
              Qo‘shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default Addbook;
