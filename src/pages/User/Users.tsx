import { useMemo, Fragment, useCallback } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table"
import {
  FaSearch,
  FaChevronDown,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaSortUp,
  FaSortDown,
  FaSort,
} from "react-icons/fa";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

interface ButtonProps {
  content: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

const Button2: React.FC<ButtonProps> = ({
  content,
  onClick,
  active = false,
  disabled = false,
}) => {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg   dark:bg-meta-4 ${
        active ? "bg-green-600 text-white dark:bg-primary" : "text-primary"
      } ${!disabled ? " hover:bg-primary hover:text-white" : "text-primarylight2 bg-white cursor-not-allowed"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

interface InputGroupProps {
  label: string;
  username: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  decoration: React.ReactNode;
  className?: string;
  inputClassName?: string;
  decorationClassName?: string;
  disabled?: boolean;
}

const InputGroup7: React.FC<InputGroupProps> = ({
  label,
  username,
  value,
  onChange,
  type = "text",
  decoration,
  className = "",
  inputClassName = "",
  decorationClassName = "dark:bg-boxdark dark:border-none",
  disabled = false,
}) => {
  return (
    <div
      className={`flex flex-row-reverse items-stretch w-full rounded-xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.03)] ${className}`}
    >
      <input
        id={username}
        name={username}
        value={value}
        type={type}
        placeholder={label}
        aria-label={label}
        onChange={onChange}
        className={`peer block w-full p-3 text-gray-600 focus:outline-none focus:ring-0 appearance-none dark:bg-boxdark ${
          disabled ? "bg-gray-200" : ""
        } ${inputClassName}`}
        disabled={disabled}
      />
      <div
        className={`flex items-center pl-3 py-3 text-gray-600 ${
          disabled ? "bg-gray-200" : ""
        } ${decorationClassName}`}
      >
        {decoration}
      </div>
    </div>
  );
};

interface SelectMenuProps {
  value: number;
  setValue: (value: number) => void;
  options: { id: number; caption: string }[];
  className?: string;
  disabled?: boolean;
}

const SelectMenu1: React.FC<SelectMenuProps> = ({
  value,
  setValue,
  options,
  className = "",
  disabled = false,
}) => {
  const selectedOption = useMemo(
    () => options.find((o) => o.id === value),
    [options, value]
  );
  return (
    <Listbox value={value} onChange={setValue} disabled={disabled}>
      <div className={`relative w-full ${className}`}>
        <ListboxButton
          className={`relative w-full rounded-xl py-3 pl-3 pr-10 dark:bg-boxdark text-base text-gray-700 text-left shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none ${
            disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white cursor-default"
          }`}
        >
          <span className="block truncate">{selectedOption?.caption}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaChevronDown size="0.80rem" className="text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-boxdark text-base shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none">
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-3 pl-10 pr-4 ${
                    active ? "bg-green-100 dark:bg-meta-4" : ""
                  }`
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {option.caption}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-400">
                        <FaCheck size="0.5rem" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};

interface GlobalSearchFilterProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  className?: string;
}

const GlobalSearchFilter1: React.FC<GlobalSearchFilterProps> = ({
  globalFilter,
  setGlobalFilter,
  className = "",
}) => {
  return (
    <InputGroup7
      username="search"
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      label="Search"
      decoration={<FaSearch size="1rem" className="text-gray-400" />}
      className={className}
    />
  );
};

interface PaginationNavProps {
  gotoPage: (page: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
}

const PaginationNav1: React.FC<PaginationNavProps> = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) => {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    const visiblePageButtonCount = 3;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
    const pageIndices = [pageIndex];
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button2
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ));
  }, [pageCount, pageIndex, gotoPage]);

  return (
    <ul className="flex justify-center items-center gap-2 ">
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronLeft size="0.6rem" />
              <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronRight size="0.6rem" />
              <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  );
};

interface UserData {
  username: string;
  email: string;
  role: string;
  status: string;
}

const UserData: UserData[] = [
  {
    username: "emma561",
    email: 'emmanuel13@gmail.com',
    role: "Admin",
    status: "Active",
  },
  {
    username: "eddyphsycho",
    email: 'phsycho5@gmail.com',
    role: "Quiz Creator",
    status: "Inactive",
  },
  {
    username: "danii",
    email: 'danii68@gmail.com',
    role: "Quiz Creator",
    status: "Active",
  },
  {
    username: "holison",
    email: 'holison23@gmail.com',
    role: "Quiz Creator",
    status: "Inactive",
  },
  {
    username: "danzytech",
    email: 'danzytech57@gmail.com',
    role: "Admin",
    status: "Active",
  },
  {
    username: "via_yank",
    email: 'via_yank@gmail.com',
    role: "Quiz Creator",
    status: "Active",
  },
  {
    username: "edinam",
    email: "edinam18@gmail.com",
    role: "Quiz Creator",
    status: "Inactive",
  },
  {
    username: "jerioum",
    email: "jerioum34@gmail.com",
    role: "Admin",
    status: "Active",
  },
];

const Users: React.FC = () => {
  const data = useMemo(() => UserData, []);
  const columns = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }: { value: string }) => (
          <span
            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
              value === "Active"
                ? "bg-success text-success"
                : value === "inactive"
                ? "bg-danger text-danger"
                : "bg-warning text-warning"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Action",
        Cell: () => (
          <div className="flex space-x-2 text">
              <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div>
      {/* <Breadcrumb pageName="Users" /> */}
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mb-5">
      <div className="max-w-full overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <GlobalSearchFilter1
            className="sm:w-64"
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <SelectMenu1
            className="sm:w-44"
            value={pageSize}
            setValue={setPageSize}
            options={[
              { id: 5, caption: "5 items per page" },
              { id: 10, caption: "10 items per page" },
            ]}
          />
        </div>
        <table {...getTableProps()} className="w-full table-auto">
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-2 text-left dark:bg-meta-4"
              >
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"
                  >
                    <div className="flex items-center justify-between">
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <FaSortDown />
                            : <FaSortUp />
                          : <FaSort />}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row : any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <td
                      {...cell.getCellProps()}
                      className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
        <PaginationNav1
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
        />
    </div>
  );
};

export default Users;
