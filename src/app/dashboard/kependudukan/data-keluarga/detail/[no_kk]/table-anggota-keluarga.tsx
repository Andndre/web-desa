"use client";

import Icon from "@/components/icon/Icon";
import {
  DetailKartuKeluargaResponse,
  applyUrutan,
} from "@/server/data/kartuKeluargaData";
import React, { useState } from "react";
import { Button, Card } from "reactstrap";

interface TableAnggotaKeluargaProps {
  data: DetailKartuKeluargaResponse;
}

function TableAnggotaKeluarga({ data }: TableAnggotaKeluargaProps) {
  const [dataTable, setData] = useState<DetailKartuKeluargaResponse>(data);
  const [saveButton, setSaveButton] = useState(false);

  async function simpan() {
    await applyUrutan(dataTable.penduduk);
    setSaveButton(false);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setSaveButton(true);
    const updatedData = [...dataTable.penduduk];
    updatedData[index].urutan -= 1;
    updatedData[index - 1].urutan += 1;
    [updatedData[index], updatedData[index - 1]] = [
      updatedData[index - 1],
      updatedData[index],
    ];
    setData({
      ...dataTable,
      penduduk: updatedData,
    });
  }

  function moveDown(index: number) {
    if (index === dataTable.penduduk.length - 1) return;
    setSaveButton(true);
    const updatedData = [...dataTable.penduduk];
    updatedData[index].urutan += 1;
    updatedData[index + 1].urutan -= 1;
    [updatedData[index], updatedData[index + 1]] = [
      updatedData[index + 1],
      updatedData[index],
    ];
    setData({
      ...dataTable,
      penduduk: updatedData,
    });
  }

  return (
    <Card className="card-bordered card-preview">
      {saveButton && (
        <Button onClick={() => simpan()} color="primary" className="mb-1">
          <Icon name="save" className="me-2" /> Simpan
        </Button>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>
              <span className="overline-title">#</span>
            </th>
            <th>
              <span className="overline-title">Nama</span>
            </th>
            <th>
              <span className="overline-title">NIK</span>
            </th>
            <th>
              <span className="overline-title">Jenis Kelamin</span>
            </th>
            <th>
              <span className="overline-title">Peran</span>
            </th>
            <th>
              <span className="overline-title">Aksi</span>
            </th>
            <th>
              <span className="overline-title"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataTable.penduduk.map((anggota, i) => {
            return (
              <tr key={anggota.nik}>
                <td>{anggota.urutan}</td>
                <td>{anggota.nama}</td>
                <td>{anggota.nik}</td>
                <td>{anggota.jenis_kelamin}</td>
                <td>
                  {anggota.hubungan?.nama || "BELUM DIATUR"}{" "}
                  {i == 0 && " | KEPALA KELUARGA"}
                </td>
                <td>
                  {i != 0 && (
                    <Button
                      className="me-1"
                      size="sm"
                      onClick={() => moveUp(i)}
                    >
                      <Icon name="arrow-up" />
                    </Button>
                  )}
                  {i != dataTable.penduduk.length - 1 && (
                    <Button size="sm" onClick={() => moveDown(i)}>
                      <Icon name="arrow-down" />
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default TableAnggotaKeluarga;
