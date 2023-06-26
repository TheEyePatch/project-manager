import React, { useEffect, useContext, useState } from "react";
import { getProjectMembers } from "../../api";
import AuthContext from "../../store/AuthContext";
import SubHeaderContext from "../../store/SubHeaderContext";
import { MembersTable, MemberInviteButton } from "../../components";


function MembersPage () {
  const [members, setMembers] = useState([])
  const auth = useContext(AuthContext)
  const subHeaderCtx = useContext(SubHeaderContext)

  useEffect(() => {
    getProjectMembers({params: {project_id: subHeaderCtx.project_id}, token: auth.token})
    .then(res => {
      setMembers([...res.participants, res.owner])
    })
  }, [])
  return(
    <>
      <MembersTable rows={members} />

      <MemberInviteButton token={auth.token} project_id={subHeaderCtx.project_id}/>
    </>
  )
}

export default MembersPage;
