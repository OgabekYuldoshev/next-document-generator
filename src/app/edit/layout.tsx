import React, { type ReactNode } from "react";

const EditLayout = ({ children }: { children: ReactNode }) => {
	return <div className="w-full h-full max-h-screen">{children}</div>;
};

export default EditLayout;
