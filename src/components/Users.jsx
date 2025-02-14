import { useState, useEffect, useCallback } from "react";
import {
  db,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "../firbaseconfigs";
import { getDoc } from "firebase/firestore";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const usersCollection = collection(db, "Users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const firstUserBookRef = usersList[0].favoriteBook
      const b = await getDoc(firstUserBookRef) 
      
      setUsers(usersList);
    } catch (e) {
      console.error("Fetching error", e);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleAddUsers = useCallback(async () => {
    try {
      const usersCollection = collection(db, "Users");
      await addDoc(usersCollection, newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUser({ name: "" });
    } catch (e) {
      console.error("Adding error", e);
    }
  }, [newUser]);

  const handleEditUser = useCallback(async (id, updatedUser) => {
    try {
      const userDoc = doc(db, "Users", id);
      await updateDoc(userDoc, updatedUser);
      setUsers((prevUser) =>
        prevUser.map((user) => (user.id === id ? updatedUser : user))
      );
      setEditingUser(null);
      setNewUser({ name: "" });
    } catch (e) {
      console.error("Editing error", e);
    }
  }, []);

  const handleDeleteUser = useCallback(async (id) => {
    try {
      const userDoc = doc(db, "Users", id);
      await deleteDoc(userDoc);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (e) {
      console.error("Deleting error", e);
    }
  }, []);



  return (
    <div>
      <div>
        <h2>{editingUser ? "Editing" : "UserList"} </h2>

        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {editingUser ? (
          <>
            <button onClick={() => handleEditUser(editingUser.id, newUser)}>
              Save
            </button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddUsers}>ADD</button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setNewUser({ name: user.name });
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div></div>
    </div>
  );
}
