import React, { useState } from "react";

const SubHeaderContext = React.createContext({
  project_id: 0,
  setProjectId: () => {}
})

export function SubHeaderContextProvider({children}) {
  const [project_id, setProjectId] = useState();

  const handleProjectId = (val) => {
    sessionStorage.setItem('subHeaderProjectId', val)
    setProjectId(sessionStorage.getItem('subHeaderProjectId'))
  }

  const SubHeaderContextValue = {
    project_id: project_id || sessionStorage.getItem('subHeaderProjectId'),
    setProjectId: handleProjectId
  }

  return (
    <SubHeaderContext.Provider value={SubHeaderContextValue}>
      {children}
    </SubHeaderContext.Provider>
  )
}


export default SubHeaderContext;
