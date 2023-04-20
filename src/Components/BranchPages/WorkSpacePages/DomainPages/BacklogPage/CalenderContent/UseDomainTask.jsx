import { useSelector } from "react-redux";

 const UseDomainTask = () => {
  // const Tasks={}
  const domainTask = useSelector((state) => state.domainTask);
  const pageNameValue = useSelector((state) => state.PageNameB);
  const workSpaceStateValue = useSelector((state) => state.workspaceDataB);
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  let values={
    domainTask,
    workSpaceStateValue,
    myTaskStateValue,
    pageNameValue
  }

  return values;
};
export default UseDomainTask