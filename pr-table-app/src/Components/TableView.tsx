import { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import type { DataTablePageEvent } from 'primereact/datatable';

import type { ArtItem } from './types';
import { useArtworkData } from './useArtworkData';
import { TitleHeader } from './header';

export const TableView = () => {
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(0);
  const [selectedMap, setSelectedMap] = useState<Record<number, ArtItem>>({});
  const [selectCount, setSelectCount] = useState<number>(0);
  const overlayRef = useRef<OverlayPanel>(null!);

  
  const { data, totalRecords } = useArtworkData(page);

  
  const selectedRows = data.filter((item) => selectedMap[item.id]);

  
  const onPageChange = (e: DataTablePageEvent) => {
    const newPage = Math.floor(e.first! / e.rows!) + 1;
    if (newPage !== page) {
      setPage(newPage);
      setFirst(e.first!);
    }
  };

  
  const handleSelectionChange = (e: { value: ArtItem[] }) => {
    const updatedMap = { ...selectedMap };

    
    e.value.forEach((item) => {
      updatedMap[item.id] = item;
    });

    
    data.forEach((item) => {
      if (!e.value.some((row) => row.id === item.id)) {
        delete updatedMap[item.id];
      }
    });

    setSelectedMap(updatedMap);
  };

  
  const handleSelectNRows = async () => {
    const updatedMap = { ...selectedMap };
    const itemsNeeded = selectCount;
    const itemsPerPage = 12;
    const pagesNeeded = Math.ceil(itemsNeeded / itemsPerPage);

    let allItems: ArtItem[] = [];

    
    for (let p = 1; p <= pagesNeeded; p++) {
      const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${p}`);
      const json = await res.json();
      allItems = allItems.concat(json.data);
      if (allItems.length >= itemsNeeded) break;
    }

    
    allItems.slice(0, itemsNeeded).forEach((item) => {
      updatedMap[item.id] = item;
    });

    setSelectedMap(updatedMap);

    
    if (overlayRef.current) {
      overlayRef.current.hide();
    }
  };

  return (
    <div className="p-4">
      <DataTable
        value={data}
        lazy
        paginator
        first={first} 
        rows={12}
        totalRecords={totalRecords}
        onPage={onPageChange}
        dataKey="id"
        selection={selectedRows}
        onSelectionChange={handleSelectionChange}
        selectionMode="checkbox"
        showGridlines
      >
        <Column selectionMode="multiple" headerStyle={{ width: '2rem' }} />

        <Column
          field="title"
          header={
            <TitleHeader
              selectCount={selectCount}
              setSelectCount={setSelectCount}
              totalRecords={totalRecords}
              handleSelectNRows={handleSelectNRows}
              overlayRef={overlayRef}
            />
          }
        />
        <Column field="place_of_origin" header="Place Of Origin" />
        <Column field="artist_display" header="Artist Display" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>
    </div>
  );
};