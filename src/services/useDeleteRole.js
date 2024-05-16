import { useState } from "react";
import axios from "axios";

const useDeleteRole = () => {
  const [deleteRoleloading, setDeleteRoleLoading] = useState(false);
  const [deleteRoleError, setDeleteRoleError] = useState(null);
  const [roleDeleted, setRoleDeleted] = useState(false);

  const deleteRole = async (userData) => {
    setDeleteRoleLoading(true);
    setDeleteRoleError(null);

    try {
      const response = await axios.post(
        "https://maslogistics-555196998.eu-north-1.elb.amazonaws.com/admin/deleteUser",
        userData,
        {
          auth: { 
            username: localStorage.getItem("username"),
            password: localStorage.getItem("userkey"),
          },
        }
      );
      const token = response.data;
      setRoleDeleted(token);
    } catch (error) {
        setDeleteRoleError(error.response.data ? error.response.data : "An error occurred");
    } finally {
        setDeleteRoleLoading(false);
    }
  };

  return { deleteRoleloading, deleteRoleError, roleDeleted, deleteRole };
};

export default useDeleteRole;
