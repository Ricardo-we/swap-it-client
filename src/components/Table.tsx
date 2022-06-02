import { Table as BsTable, TableProps as BsTableProps } from "react-bootstrap";

interface TableProps extends BsTableProps{
  tableItems?: Array<object> | Array<string>;
  tableHeadings?: Array<string>;
}

export default function Table({ tableItems, tableHeadings, ...props }: TableProps) {
  return (
    <BsTable responsive bordered {...props}>
      <thead>
        <tr>
          {tableHeadings &&
            tableHeadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {tableItems && tableItems.map((rows, index) => (
            <tr key={index}>
            {Object.values(rows).map((columns, index) => (
                <td key={index+1*2}>{columns}</td>
                ))}
            </tr>
        ))}
      </tbody>
    </BsTable>
  );
}
