package cl.duoc.levelup.catalogservice.service;

import cl.duoc.levelup.catalogservice.model.Producto;
import cl.duoc.levelup.catalogservice.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;



    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public Producto findByCodigo(String codigo) {
        return productoRepository.findById(codigo).orElse(null);
    }

    public Producto save(Producto producto) {

        if (producto.getStock() == null || producto.getStock() < 0) {
            producto.setStock(0);
        }
        return productoRepository.save(producto);
    }

    public void deleteByCodigo(String codigo) {
        productoRepository.deleteById(codigo);
    }




    public boolean descontarStock(String codigo, int cantidad) {
        if (cantidad <= 0) return false;

        Producto p = findByCodigo(codigo);
        if (p == null) {
            return false;
        }

        if (p.getStock() == null) {
            p.setStock(0);
        }

        if (p.getStock() < cantidad) {

            return false;
        }

        p.setStock(p.getStock() - cantidad);
        productoRepository.save(p);
        return true;
    }

    public boolean aumentarStock(String codigo, int cantidad) {
        if (cantidad <= 0) return false;

        Producto p = findByCodigo(codigo);
        if (p == null) {
            return false;
        }

        if (p.getStock() == null) {
            p.setStock(0);
        }

        p.setStock(p.getStock() + cantidad);
        productoRepository.save(p);
        return true;
    }
}
