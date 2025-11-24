package cl.duoc.levelup.repository;

import cl.duoc.levelup.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductoRepository extends JpaRepository<Producto, String> {

}
