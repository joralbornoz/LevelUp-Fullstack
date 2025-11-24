package cl.duoc.levelup.repository;

import cl.duoc.levelup.model.Compra;
import cl.duoc.levelup.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompraRepository extends JpaRepository<Compra, Long> {
    List<Compra> findByUsuarioOrderByFechaDesc(Usuario usuario);
}
