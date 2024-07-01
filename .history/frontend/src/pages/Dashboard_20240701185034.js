const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: '', cliente: '', volume: '', status: '', tempoEstimado: '' });

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregas(response.data.filter(entrega => entrega.status === 'Em andamento').map(entrega => ({
          ...entrega,
          tempoDecorrido: calculateTempoDecorrido(entrega.dataInicio)
        })));
      } catch (error) {
        console.error('Error fetching entregas:', error);
      }
    };

    const fetchEntregadores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregadores', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregadores(response.data);
      } catch (error) {
        console.error('Error fetching entregadores:', error);
      }
    };

    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/clientes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes(response.data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    const fetchStatusList = async () => {
      try {
        const response = await api.get('/status');
        setStatusList(response.data);
      } catch (error) {
        console.error('Error fetching status list:', error);
      }
    };

    fetchEntregas();
    fetchEntregadores();
    fetchClientes();
    fetchStatusList();

    const intervalId = setInterval(() => {
      setEntregas((prevEntregas) => 
        prevEntregas.map((entrega) => ({
          ...entrega,
          tempoDecorrido: calculateTempoDecorrido(entrega.dataInicio)
        }))
      );
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmonta
  }, []);

  const calculateTempoDecorrido = (dataInicio) => {
    const now = new Date();
    const inicio = new Date(dataInicio);
    const diffInMinutes = Math.floor((now - inicio) / 60000); // Calcula a diferença em minutos
    return diffInMinutes;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entregadorExistente = entregas.find(entrega => entrega.nomeEntregador === form.nomeEntregador);
      if (entregadorExistente) {
        alert('O entregador já está em uma rotina de entrega.');
        return;
      }

      const token = localStorage.getItem('token');
      const novaEntrega = {
        ...form,
        dataInicio: new Date().toISOString() // Adiciona a data e hora de início
      };
      const response = await api.post('/entregas', novaEntrega, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas([...entregas, { ...response.data, tempoDecorrido: calculateTempoDecorrido(response.data.dataInicio) }]);
      setForm({ nomeEntregador: '', cliente: '', volume: '', status: '', tempoEstimado: '' });
    } catch (error) {
      console.error('Error adding entrega:', error);
    }
  };

  const handleFinalize = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/entregas/${id}`, { status: 'Finalizada' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas(entregas.filter(entrega => entrega._id !== id));
    } catch (error) {
      console.error('Error finalizing entrega:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/entregas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas(entregas.filter(entrega => entrega._id !== id));
    } catch (error) {
      console.error('Error deleting entrega:', error);
    }
  };

  return (
    <div>
      <h2>Entregas em Andamento</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="nomeEntregador-label">Nome do Entregador</InputLabel>
          <Select
            labelId="nomeEntregador-label"
            id="nomeEntregador"
            name="nomeEntregador"
            value={form.nomeEntregador}
            onChange={handleChange}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {entregadores.map((entregador) => (
              <MenuItem key={entregador._id} value={entregador.nome}>{entregador.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="cliente-label">Cliente</InputLabel>
          <Select
            labelId="cliente-label"
            id="cliente"
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente._id} value={cliente.nome}>{cliente.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statusList.map((status) => (
              <MenuItem key={status._id} value={status.nome}>{status.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <input name="volume" value={form.volume} onChange={handleChange} placeholder="Volume" required />
        <input name="tempoEstimado" value={form.tempoEstimado} onChange={handleChange} placeholder="Tempo Estimado" required />
        <Button type="submit" variant="contained" color="primary">Adicionar Entrega</Button>
      </form>
      <ul>
        {entregas.map((entrega) => (
          <li key={entrega._id}>
            <span>{entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume} - {entrega.status} - {entrega.tempoEstimado} minutos - Tempo Em Andamento: {entrega.tempoDecorrido} minutos</span>
            <Button onClick={() => handleFinalize(entrega._id)} variant="contained" color="secondary">Finalizar Entrega</Button>
            <Button onClick={() => handleDelete(entrega._id)} variant="contained" color="error">Excluir Entrega</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
