
import React, { useState, useEffect } from 'react';
import { backendUrl } from '../../../../../env';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const BankTable = () => {
  const [banks, setBanks] = useState([]);
  const [newBankName, setNewBankName] = useState('');
  const [newBankLink, setNewBankLink] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const fetchBanks = () => {
    fetch(`${backendUrl}api/db/banks`)
      .then(response => response.json())
      .then(data => setBanks(data))
      .catch(error => console.error('Błąd podczas pobierania listy banków:', error));
  };

  useEffect(() => {
    fetchBanks();
  }, []); // Pobranie danych przy załadowaniu komponentu

  const handleAddBank = () => {
    if (newBankName && newBankLink) {
      fetch(`${backendUrl}api/db/banks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newBankName,
          domain: newBankLink,
        }),
      })
        .then(response => response.json())
        .then(result => {
          console.log('Odpowiedź z serwera po dodaniu banku:', result);
      
          setBanks([...banks, result]);
        })
        .catch(error => {
          console.error('Błąd podczas wysyłania żądania:', error);
       
        });

      setNewBankName('');
      setNewBankLink('');
      setDialogOpen(false);
    }
  };

  const handleDeleteBank = (id) => {
    fetch(`${backendUrl}api/db/banks/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(result => {
        console.log('Odpowiedź z serwera po usunięciu banku:', result);
        
        const updatedBanks = banks.filter(bank => bank.id !== id);
        setBanks(updatedBanks);
      })
      .catch(error => {
        console.error('Błąd podczas wysyłania żądania:', error);
       
      });
  };

  return (
    <div>
      <TableContainer component={Paper} className="mt-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nazwa banku</TableCell>
              <TableCell>Link do strony</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>Brak danych</TableCell>
              </TableRow>
            ) : (
              banks.map(bank => (
                <TableRow key={bank.id}>
                  <TableCell>{bank.id}</TableCell>
                  <TableCell>{bank.name}</TableCell>
                  <TableCell>
                    <a
                      href={bank.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {bank.domain}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#FF0000', color: 'white' }}
                      onClick={() => handleDeleteBank(bank.id)}
                    >
                      Usuń
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="d-flex justify-content-center mt-3 mb-3">
        <Button
          variant="contained"
          style={{ backgroundColor: '#6A00FF', color: 'white' }}
          onClick={() => setDialogOpen(true)}
        >
          Dodaj bank
        </Button>
      </div>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Dodaj Bank</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newBankName}
            onChange={(e) => setNewBankName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Link"
            value={newBankLink}
            onChange={(e) => setNewBankLink(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Przerwij</Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#6A00FF', color: 'white' }}
            onClick={handleAddBank}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BankTable;
