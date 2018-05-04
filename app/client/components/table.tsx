import React from "react";

export interface TableProps {
  readonly data: { readonly [key: string]: string };
}

export const Table: React.SFC<TableProps> = ({ data }) => {
  const rows = Object.entries(data).map(([key, value]) => (
    <tr key={key}>
      <th>{key}</th>
      <td>{value}</td>
    </tr>
  ));
  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
};
