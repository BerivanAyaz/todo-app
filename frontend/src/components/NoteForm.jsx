import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Input, Button } from "antd";
import { createNote } from "../features/notes/noteSlice";

const NoteForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text.length > 0) {
      return toast.error("Please add a few words!");
    }

    dispatch(createNote({ text }));
    setText("");
  };

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your to do..."
          style={{
            width: "100%",
            maxWidth: "500px",
            marginBottom: "10px",
            border: "2px solid rgb(205, 156, 60)", 
          }}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "30%",
            backgroundColor: "#001529",
            borderColor: "#001529",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgb(205, 156, 60)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#001529")
          }
        >
          Add to the list
        </Button>
      </form>
    </div>
  );
};

export default NoteForm;
