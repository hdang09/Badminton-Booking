"use client";

import { useState } from "react";

import { numberToPrice } from "@/libs/helper";
import { Table } from "@mantine/core";
import CustomTable from "@/components/CustomTable";

export default function Payment() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const elements = [
    {
      id: 1,
      fullName: "Nguyễn Văn A",
      phone: "0123456789",
      amount: 425000,
      paymentType: "Chuyển khoản",
      createdAt: "2021-06-01",
    },
    {
      id: 2,
      fullName: "Nguyễn Văn B",
      phone: "0123456789",
      amount: 425000,
      paymentType: "Chuyển khoản",
      createdAt: "2021-06-01",
    },
    {
      id: 3,
      fullName: "Nguyễn Văn C",
      phone: "0123456789",
      amount: 565000,
      paymentType: "Chuyển khoản",
      createdAt: "2021-06-01",
    },
    {
      id: 4,
      fullName: "Nguyễn Văn D",
      phone: "0123456789",
      amount: 425000,
      paymentType: "Chuyển khoản",
      createdAt: "2021-06-01",
    },
    {
      id: 5,
      fullName: "Nguyễn Văn E",
      phone: "0123456789",
      amount: 565000,
      paymentType: "Chuyển khoản",
      createdAt: "2021-06-01",
    },
    {
      id: 6,
      fullName: "Nguyễn Văn F",
      phone: "0123456789",
      amount: 425000,
      paymentType: "Chuyển khoản",
      createdAt: "2021-06-01",
    },
    {
      id: 7,
      fullName: "Nguyễn Văn G",
      phone: "0123456789",
      amount: 425000,
      paymentType: "Chuyển khoản",
      createdAt: "2021-06-01",
    },
    {
      id: 8,
      fullName: "Nguyễn Văn H",
      phone: "0123456789",
      amount: 565000,
      paymentType: "Chuyển khoản",
      createdAt: "2021-06-01",
    },
  ];

  const filteredData = Array.isArray(elements)
    ? elements.filter((element) =>
        element.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
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
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{numberToPrice(element.amount)}</Table.Td>
      <Table.Td>{element.paymentType}</Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
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
