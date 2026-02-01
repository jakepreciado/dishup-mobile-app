import AddItemModal from '@/components/add-item-modal';
import EditItemModal from '@/components/edit-item-modal';
import { capitalizeWords } from '@/utils/helperFunctions';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { PantryContext, PantryItem } from '../../context/PantryContext';

export default function Pantry() {
  const swipeRefs = useRef<{ [key: string]: Swipeable | null }>({});
  const { pantryItems, addItem, deleteItem, editItem } = useContext(PantryContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<PantryItem[]>(pantryItems);
  const [showBanner, setShowBanner] = useState(false);

  // Filter pantry items by search term
  useEffect(() => {
    setFilteredItems(
      pantryItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pantryItems]);

  // Handle add success
  const handleAddSuccess = (item: { name: string; quantity?: number; unit?: string }) => {
    addItem(item);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 2000);
  };

  // Handle edit
  const handleEdit = (item: PantryItem) => {
    // Close swipe row
    swipeRefs.current[item.id]?.close();

    setEditingItem(item);
    setName(item.name);
    setQuantity(item.quantity?.toString() || '');
    setUnit(item.unit || '');
    setEditModalVisible(true);
  };

  const handleDelete = (item: PantryItem) => {
    // Close swipe row
    swipeRefs.current[item.id]?.close();
    deleteItem(item.id);
  };

  // Swipeable buttons: edit and delete
  const renderRightActions = (item: PantryItem) => (
    <View style={{ flexDirection: 'row', height: '100%' }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#2f95dc',
          justifyContent: 'center',
          alignItems: 'center',
          width: 48,
          height: 48,
        }}
        onPress={() => handleEdit(item)}
      >
        <Ionicons name="pencil" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          width: 48,
          height: 48,
        }}
        onPress={() => handleDelete(item)}
      >
        <Ionicons name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Success banner */}
      {showBanner && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#4BB543',
            padding: 12,
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Item successfully added!</Text>
        </View>
      )}

      <View style={{ flex: 1, padding: 20, marginTop: showBanner ? 40 : 0 }}>
        <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 10 }}>Pantry</Text>

        {/* Search */}
        <TextInput
          placeholder="Search items..."
          placeholderTextColor="#00000080"
          value={search}
          onChangeText={setSearch}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 6 }}
        />

        {/* Pantry list */}
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Swipeable
              ref={ref => {
                if (ref) swipeRefs.current[item.id] = ref;
              }}
              renderRightActions={() => renderRightActions(item)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {capitalizeWords(item.name)}
                </Text>
                <Text>{item.quantity ?? ''} {item.unit ?? ''}</Text>
              </View>
            </Swipeable>
          )}
          ListEmptyComponent={<Text style={{ marginTop: 20 }}>No items found</Text>}
        />

        {/* Add Item Button */}
        <TouchableOpacity
          style={{ backgroundColor: '#c44a4a', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 20 }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Add Item</Text>
        </TouchableOpacity>

        {/* Add Modal */}
        <AddItemModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddSuccess}
        />

        {/* Edit Modal */}
        <EditItemModal
          visible={editModalVisible}
          item={editingItem}
          onClose={() => {
            setEditModalVisible(false);
            setEditingItem(null);
          }}
          onSubmit={editItem}
        />
      </View>
    </View>
  );
}