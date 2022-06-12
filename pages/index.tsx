import * as React from 'react';

import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from '@tanstack/react-table';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const table = createTable().setRowType<Person>();

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const defaultColumns = [
  table.createDataColumn('firstName', {
    cell: (info) => info.getValue(),
    footer: (props) => null,
  }),
  table.createDataColumn((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => null,
  }),

  table.createDataColumn('age', {
    header: () => 'Age',
    footer: (props) => null,
  }),
  table.createDataColumn('visits', {
    header: () => <span>Visits</span>,
    footer: (props) => null,
  }),
  table.createDataColumn('status', {
    header: 'Status',
    footer: (props) => null,
  }),
  table.createDataColumn('progress', {
    header: 'Profile Progress',
    footer: (props) => null,
  }),
  table.createDisplayColumn({
    id: 'actions',
    cell: (props) => <button>Hello</button>,
    footer: (props) => null,
  }),
];

export default function Home() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  const rerender = React.useReducer(() => ({}), {})[1];

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => {
            console.log(headerGroup);
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
}
