import React, { useEffect, useState } from 'react';
import { Table, Input, Select } from 'antd';
import { fetchItems } from '../redux/slices/itemsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/Hooks'
import styles from './ItemsTable.module.scss';

const { Search } = Input;
const { Option } = Select;

const ItemsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.items);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    let updatedItems = items;

    if (searchTerm) {
      updatedItems = updatedItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      updatedItems = updatedItems.filter(item => 
        item.category === selectedCategory
      );
    }

    setFilteredItems(updatedItems);
  }, [items, searchTerm, selectedCategory]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => (
        <div className={styles.imageColumn}>
          <img src={text} alt="item" />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Details',
      dataIndex: 'id',
      key: 'details',
      render: (id: string) => <a href={`/details/${id}`} className={styles.detailsLink}>View Details</a>,
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <Search 
        placeholder="Search by name" 
        onSearch={handleSearch} 
        className={styles.searchInput} 
        allowClear 
      />
      <Select
        placeholder="Select category"
        onChange={handleCategoryChange}
        className={styles.categorySelect}
        allowClear
      >
        {Array.from(new Set(items.map(item => item.category))).map(category => (
          <Option key={category} value={category}>{category}</Option>
        ))}
      </Select>
      <Table 
        columns={columns} 
        dataSource={filteredItems} 
        loading={loading} 
        rowKey="id" 
        className={styles.table}
      />
    </div>
  );
};

export default ItemsTable;
