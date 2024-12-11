import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, List, Typography, Empty, Pagination } from "antd";
import { getNotes, reset } from "../features/notes/noteSlice";
import NoteForm from "../components/NoteForm";
import ListItem from "../components/ListItem";

const { Title } = Typography;

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { notes, isError, isLoading, message } = useSelector(
    (state) => state.notes
  );

  const [currentPage, setCurrentPage] = useState(1); 
  const pageSize = 3; 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getNotes());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, navigate, dispatch, message]);

  const currentNotes = notes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dashboard">
      <Title level={2}>{user && `${user.name}'s To Do List`}</Title>
      <NoteForm />
      {notes.length > 0 ? (
        <>
          <List
            className="list"
            itemLayout="horizontal"
            dataSource={currentNotes} 
            renderItem={(note) => <ListItem key={note._id} note={note} />}
          />
          <Pagination
            current={currentPage} 
            pageSize={pageSize} 
            total={notes.length} 
            onChange={onPageChange} 
            showSizeChanger={false}
            style={{ marginTop: "20px", textAlign: "center" }}
          />
        </>
      ) : (
        <Empty description="No notes added yet!" />
      )}
    </div>
  );
};

export default Dashboard;
