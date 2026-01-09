import React, { useState } from 'react';

const INITIAL_DATA = {
  columns: {
    backlog: { title: "Backlog", tasks: [{ id: "t1", title: "🎯 Design login page" }] },
    inProgress: { title: "In Progress", tasks: [{ id: "t2", title: "🚀 Build navbar" }] },
    done: { title: "Done", tasks: [] }
  }
};

export default function App() {
  const [board, setBoard] = useState(INITIAL_DATA);

  const moveTask = (taskId, sourceColId, destColId) => {
    setBoard(prev => {
      const taskToMove = prev.columns[sourceColId].tasks.find(t => t.id === taskId);
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [sourceColId]: { ...prev.columns[sourceColId], tasks: prev.columns[sourceColId].tasks.filter(t => t.id !== taskId) },
          [destColId]: { ...prev.columns[destColId], tasks: [...prev.columns[destColId].tasks, taskToMove] }
        }
      };
    });
  };

  const addTask = (colId) => {
    const newTask = { id: `t${Date.now()}`, title: "New Task (Click to edit)" };
    setBoard(prev => ({
      ...prev,
      columns: { ...prev.columns, [colId]: { ...prev.columns[colId], tasks: [...prev.columns[colId].tasks, newTask] } }
    }));
  };

  const deleteTask = (colId, taskId) => {
    setBoard(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [colId]: {
          ...prev.columns[colId],
          tasks: prev.columns[colId].tasks.filter(t => t.id !== taskId)
        }
      }
    }));
  };

  const editTask = (colId, taskId) => {
    const newTitle = prompt("Edit task title:");
    if (!newTitle) return;
    setBoard(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [colId]: {
          ...prev.columns[colId],
          tasks: prev.columns[colId].tasks.map(t => 
            t.id === taskId ? { ...t, title: newTitle } : t
          )
        }
      }
    }));
  };

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.mainTitle}>Project Kanban</h1>
      
      <div style={styles.boardContainer}>
        {Object.entries(board.columns).map(([colId, column]) => (
          <div key={colId} style={styles.column}>
            <div style={styles.columnHeader}>
              <h2 style={styles.columnTitle}>{column.title}</h2>
              <span style={styles.countBadge}>{column.tasks.length}</span>
            </div>

            <div style={styles.taskContainer}>
              {column.tasks.map(task => (
                <div key={task.id} style={styles.card}>
                  <p style={styles.cardText}>{task.title}</p>
                  <div style={styles.buttonGroup}>
                    <button 
                      onClick={() => editTask(colId, task.id)} 
                      style={styles.editBtn}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => deleteTask(colId, task.id)} 
                      style={styles.deleteBtn}
                    >
                      🗑️ Delete
                    </button>
                    {Object.keys(board.columns).map(destId => 
                      destId !== colId && (
                        <button 
                          key={destId} 
                          onClick={() => moveTask(task.id, colId, destId)} 
                          style={styles.greenBtn}
                        >
                          Move to {board.columns[destId].title}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => addTask(colId)} style={styles.addCardBtn}>+ Add a card</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#0079BF',
    padding: '40px 20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  mainTitle: { color: '#fff', marginBottom: '30px', fontSize: '2.5rem' },
  boardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    width: '85%',
    maxWidth: '1200px'
  },
  column: {
    flex: 1,
    backgroundColor: '#EBECF0',
    borderRadius: '12px',
    padding: '15px',
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  columnHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', padding: '0 5px' },
  columnTitle: { fontSize: '18px', fontWeight: 'bold', color: '#172B4D', margin: 0 },
  countBadge: { backgroundColor: '#DFE1E6', padding: '2px 10px', borderRadius: '12px', fontSize: '12px' },
  taskContainer: { flexGrow: 1 },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '12px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    borderBottom: '2px solid #ddd'
  },
  cardText: { margin: '0 0 12px 0', fontSize: '15px', color: '#172B4D' },
  buttonGroup: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  editBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  greenBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  addCardBtn: {
    marginTop: 'auto',
    padding: '10px',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    color: '#5E6C84',
    cursor: 'pointer',
    fontWeight: '500',
    borderRadius: '8px'
  }
};
