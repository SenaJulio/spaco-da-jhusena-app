import React, { useState, useEffect } from 'react';

const App = () => {
  const [services, setServices] = useState([]);
  const [finance, setFinance] = useState([]);
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceValue, setServiceValue] = useState('');
  const [financeDesc, setFinanceDesc] = useState('');
  const [financeValue, setFinanceValue] = useState('');

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services')) || [];
    const storedFinance = JSON.parse(localStorage.getItem('finance')) || [];
    setServices(storedServices);
    setFinance(storedFinance);
  }, []);

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
    localStorage.setItem('finance', JSON.stringify(finance));
  }, [services, finance]);

  const addService = () => {
    if (serviceDesc && serviceValue) {
      const newService = {
        desc: serviceDesc,
        value: parseFloat(serviceValue),
        date: new Date().toLocaleDateString()
      };
      setServices([newService, ...services]);
      setServiceDesc('');
      setServiceValue('');
    }
  };

  const addFinance = () => {
    if (financeDesc && financeValue) {
      const newFinance = {
        desc: financeDesc,
        value: parseFloat(financeValue),
        date: new Date().toLocaleDateString()
      };
      setFinance([newFinance, ...finance]);
      setFinanceDesc('');
      setFinanceValue('');
    }
  };

  const totalServices = services.reduce((sum, item) => sum + item.value, 0);
  const totalFinance = finance.reduce((sum, item) => sum + item.value, 0);
  const balance = totalServices - totalFinance;

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
         <header className="bg-green-700 text-white p-4 flex items-center shadow">
  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-white flex items-center justify-center">
    <img
      src="https://senajulio.github.io/spaco-da-jhusena.io/images/logo.png"
      alt="Logo Spaço da Jhuséna"
      className="max-w-full max-h-full object-contain p-1"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/64x64/CCCCCC/333333?text=Erro';
      }}
    />
  </div>
  <h1 className="text-2xl font-bold">Spaço da Jhuséna</h1>
</header>
                                          
      <main className="p-4 max-w-3xl mx-auto">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Registrar Banho e Tosa</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Descrição"
              value={serviceDesc}
              onChange={(e) => setServiceDesc(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Valor"
              value={serviceValue}
              onChange={(e) => setServiceValue(e.target.value)}
              className="w-32 p-2 border rounded"
            />
            <button onClick={addService} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Adicionar
            </button>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Registrar Despesas</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Descrição"
              value={financeDesc}
              onChange={(e) => setFinanceDesc(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Valor"
              value={financeValue}
              onChange={(e) => setFinanceValue(e.target.value)}
              className="w-32 p-2 border rounded"
            />
            <button onClick={addFinance} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Adicionar
            </button>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Resumo Financeiro</h2>
          <div className="bg-white shadow p-4 rounded">
            <p>Total de Serviços: R$ {totalServices.toFixed(2)}</p>
            <p>Total de Despesas: R$ {totalFinance.toFixed(2)}</p>
            <p className={`font-bold ${balance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              Saldo: R$ {balance.toFixed(2)}
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Histórico de Serviços</h2>
          <ul className="bg-white shadow p-4 rounded space-y-1">
            {services.map((item, index) => (
              <li key={index}>
                {item.date} - {item.desc} - R$ {item.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Histórico de Despesas</h2>
          <ul className="bg-white shadow p-4 rounded space-y-1">
            {finance.map((item, index) => (
              <li key={index}>
                {item.date} - {item.desc} - R$ {item.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default App;
