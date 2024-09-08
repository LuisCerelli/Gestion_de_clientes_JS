let clientes = [];

document.getElementById('client-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const rut = document.getElementById('rut').value;
    
    registrarCliente(nombre, apellido, rut);
});

document.getElementById('mascota-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const rutCliente = document.getElementById('rut-cliente').value;
    const nombreMascota = document.getElementById('nombre-mascota').value;
    const tipoMascota = document.getElementById('tipo-mascota').value;

    agregarMascota(rutCliente, nombreMascota, tipoMascota);
});

document.getElementById('listar-clientes').addEventListener('click', function() {
    listarClientes();
});

document.getElementById('imprimir-historial').addEventListener('click', function() {
    const rut = prompt("Ingrese el RUT del cliente para imprimir el historial:");
    imprimirHistorialVisitas(rut);
});

function registrarCliente(nombre, apellido, rut) {
    const cliente = {
        nombre,
        apellido,
        rut,
        mascotas: []
    };
    clientes.push(cliente);
    alert(`Cliente ${nombre} ${apellido} registrado correctamente.`);
}

function agregarMascota(rut, nombre, tipo) {
    const cliente = clientes.find(c => c.rut === rut);
    if (cliente) {
        cliente.mascotas.push({ nombre, tipo });
        alert(`Mascota ${nombre} agregada a cliente con RUT ${rut}.`);
    } else {
        alert('Cliente no encontrado.');
    }
}

function listarClientes() {
    const output = document.getElementById('output');
    output.innerHTML = '';
    
    if (clientes.length === 0) {
        output.innerHTML = '<p>No hay clientes registrados.</p>';
        return;
    }

    clientes.forEach(cliente => {
        const clienteInfo = `<p><span>Cliente:</span> ${cliente.nombre} ${cliente.apellido} - RUT: ${cliente.rut}</p>`;
        const mascotasInfo = cliente.mascotas.map((m, index) => `<p>Mascota ${index + 1}: ${m.nombre} (${m.tipo})</p>`).join('');
        output.innerHTML += clienteInfo + mascotasInfo;
    });
}

function imprimirHistorialVisitas(rut) {
    const cliente = clientes.find(c => c.rut === rut);
    if (cliente) {
        let historial = `Historial de visitas para ${cliente.nombre} ${cliente.apellido}:\n\n`;
        cliente.mascotas.forEach(mascota => {
            historial += `Mascota: ${mascota.nombre} (${mascota.tipo})\n`;
            historial += `Fecha: 01/01/2024, Resumen: Visita de control general.\n\n`;
        });
        alert(historial);
    } else {
        alert('Cliente no encontrado.');
    }
}
