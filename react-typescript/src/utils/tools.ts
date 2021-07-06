const toggle = (status: string): string => {
  status = status === "hidden" ? "show" : "hidden";
  return status;
};

export default toggle;
