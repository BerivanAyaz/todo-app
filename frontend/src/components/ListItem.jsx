import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, List, Popconfirm, Typography } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteNote, updateNote } from "../features/notes/noteSlice";

const { Text } = Typography;

const ListItem = ({ note }) => {
  const [itemStatus, setItemStatus] = useState(note.textStatus);
  const { isError, message } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
  }, [note, dispatch, message]);

  const changeStatus = () => {
    const updatedNote = {
      ...note,
      textStatus: !itemStatus,
    };
    dispatch(updateNote(updatedNote));
    setItemStatus(!itemStatus);
  };

  return (
    <List.Item
      style={{
        padding: "10px 20px",
        border: "1px solid #001529",
        borderRadius: "8px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
      }}
      actions={[
        <Popconfirm
          title="Are you sure to delete this note?"
          onConfirm={() => dispatch(deleteNote(note._id))}
          okText="Yes"
          cancelText="No"
        >
          <RiDeleteBinLine
            style={{
              color: "#c54a4a",
              fontSize: "22px",
              cursor: "pointer", 
              transition: "transform 0.2s ease, color 0.3s ease", 
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.2)";
              e.target.style.color = "#ff6347"; 
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.color = "#c54a4a"; 
            }}
          />
        </Popconfirm>,
      ]}
    >
      <Checkbox
        checked={itemStatus}
        onChange={changeStatus}
        style={{
          marginRight: "10px",
          transform: "scale(1.2)",
        }}
      />
      <Text
        style={{
          textDecoration: itemStatus ? "line-through" : "none",
          opacity: itemStatus ? 0.6 : 1,
          fontSize: "16px",
        }}
      >
        {note.text}
      </Text>
    </List.Item>
  );
};

export default ListItem;
