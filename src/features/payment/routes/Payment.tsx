import { useState } from "react";

import { formatDate, formatPhoneNumber, numberToPrice } from "@/libs/helper";
import { Table } from "@mantine/core";
import CustomTable from "@/components/CustomTable";
import { useGetPayment } from "../api";

export default function Payment() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { data: payments } = useGetPayment();

  const filteredData = Array.isArray(payments)
    ? payments.filter((payment) =>
        payment.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const headers = [
    "STT",
    "Họ và tên",
    "Số điện thoại",
    "Số tiền",
    "Phương thức thanh toán",
    "Ngày tạo",
  ];

  const rows = filteredData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{formatPhoneNumber(element.phone)}</Table.Td>
      <Table.Td>{numberToPrice(element.amount)}</Table.Td>
      <Table.Td>{element.paymentType}</Table.Td>
      <Table.Td>{formatDate(element.createdAt)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <section className="container mx-auto px-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-2xl font-bold text-gray-800">Quản lý thanh toán</h2>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-secondary">
              {filteredData?.length ?? 0} thanh toán
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">Đây là những đơn thanh toán trong năm này</p>
        </div>
        <input
          className="my-2 mb-0 h-10 items-center rounded-lg bg-slate-50 pl-4 pr-9 outline-none drop-shadow"
          placeholder="Tìm kiếm họ và tên..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="mt-8 flex flex-col overflow-x-auto">
        <CustomTable headers={headers} rows={rows} />
      </div>
    </section>
  );
}
