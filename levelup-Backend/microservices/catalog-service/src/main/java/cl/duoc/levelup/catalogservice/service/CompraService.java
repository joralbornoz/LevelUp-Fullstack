// src/main/java/cl/duoc/levelup/service/CompraService.java
package cl.duoc.levelup.catalogservice.service;

import cl.duoc.levelup.catalogservice.controller.CompraController;
import cl.duoc.levelup.catalogservice.model.Compra;
import cl.duoc.levelup.catalogservice.model.Usuario;
import cl.duoc.levelup.catalogservice.repository.ProductoRepository;
import cl.duoc.levelup.catalogservice.repository.CompraRepository;
import cl.duoc.levelup.catalogservice.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Compra> obtenerComprasUsuario(Long usuarioId) {
        Usuario u = usuarioRepository.findById(usuarioId).orElse(null);
        if (u == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        return compraRepository.findByUsuarioOrderByFechaDesc(u);
    }
    public Compra registrarCompra(Long usuarioId, CompraController.CompraRequest request) {

        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("La compra no contiene productos");
        }

        int totalCalculado = 0;
        StringBuilder detalleSb = new StringBuilder();


        for (CompraController.ItemRequest item : request.getItems()) {


            var prod = productoRepository.findById(item.getCodigoProducto())
                    .orElseThrow(() -> new RuntimeException(
                            "Producto no encontrado: " + item.getCodigoProducto()
                    ));

            int stockActual = prod.getStock() != null ? prod.getStock() : 0;
            int cantidad = item.getCantidad() != null ? item.getCantidad() : 1;


            if (cantidad > stockActual) {
                throw new RuntimeException(
                        "Stock insuficiente para " + prod.getNombre() +
                                " (Stock: " + stockActual + ", pedido: " + cantidad + ")"
                );
            }


            prod.setStock(stockActual - cantidad);
            productoRepository.save(prod);

            // Calcular subtotal
            int precioUnit = item.getPrecioUnitario() != null ? item.getPrecioUnitario() : 0;
            int subtotal = precioUnit * cantidad;

            totalCalculado += subtotal;


            if (detalleSb.length() > 0) detalleSb.append(" | ");
            detalleSb.append(prod.getNombre())
                    .append(" x")
                    .append(cantidad)
                    .append(" — $")
                    .append(precioUnit);
        }


        Compra compra = new Compra();
        compra.setUsuario(usuario);
        compra.setFecha(LocalDateTime.now());
        compra.setTotal(totalCalculado);
        compra.setDetalle(detalleSb.toString());

        return compraRepository.save(compra);
    }
    @Transactional
    public void eliminarComprasDeUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        if (usuario == null) {
            return;
        }
        compraRepository.deleteByUsuario(usuario);
    }

}
